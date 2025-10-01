const BASE_URL = `${process.env.OIDC_ISSUER}/protocol/openid-connect`;

const validateOidcConfig = () => {
  const required = ["OIDC_CLIENT_ID", "OIDC_CLIENT_SECRET", "OIDC_ISSUER"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required OIDC environment variables: ${missing.join(", ")}`
    );
  }
};

const oidcFetch = async (endpoint: string, body: URLSearchParams) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const responseText = await response.text();

  if (!response.ok) {
    let errorDescription = "";
    try {
      const errorData = JSON.parse(responseText);
      errorDescription = errorData.error_description || "";
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(
      `OIDC ${endpoint} failed: ${response.status} - ${responseText} ${errorDescription}`
    );
  }

  try {
    return JSON.parse(responseText);
  } catch {
    console.warn(`⚠️ OIDC ${endpoint} response is not JSON. Returning raw text.`);
    return responseText;
  }
};

// ✅ Single source of truth for token refresh
export const refreshKeycloakToken = async (refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}> => {
  try {
    validateOidcConfig();

    console.log("🔄 Refreshing Keycloak token...", {
      clientId: process.env.OIDC_CLIENT_ID,
      hasRefreshToken: !!refreshToken,
      refreshTokenLength: refreshToken?.length
    });

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.OIDC_CLIENT_ID!,
      client_secret: process.env.OIDC_CLIENT_SECRET!,
    });

    const response = await oidcFetch("/token", body);
    
    if (!response.access_token || !response.refresh_token) {
      throw new Error("Invalid token response from Keycloak");
    }

    console.log("✅ Token refresh successful", {
      expiresIn: response.expires_in,
      hasAccessToken: !!response.access_token,
      hasRefreshToken: !!response.refresh_token
    });

    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      expiresIn: response.expires_in ?? 300, // Default 5 minutes instead of 180
    };
  } catch (error) {
    console.error("❌ Token refresh failed:", error);
    
    // Handle specific Keycloak errors
    if (error instanceof Error && error.message.includes("invalid_grant")) {
      throw new Error("RefreshTokenInvalidError");
    }
    
    throw error;
  }
};

export const logoutRequest = (refresh_token: string) => {
  validateOidcConfig();
  return oidcFetch(
    "/logout",
    new URLSearchParams({
      refresh_token,
      client_id: process.env.OIDC_CLIENT_ID!,
      client_secret: process.env.OIDC_CLIENT_SECRET!,
    })
  );
};