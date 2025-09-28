import baseApi

// Types for the badge API
interface CreateBadgeRequest {
  name: string;
  description: string;
  icon_url: string;
}

interface BadgeResponse {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_at: string;
  is_deleted: boolean;
  is_verified: boolean;
  author: string;
}

export const createBadgeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create badge mutation with enhanced debugging
    createBadge: builder.mutation<BadgeResponse, CreateBadgeRequest>({
      query: (badgeData) => {
        console.log('🚀 API: Starting badge creation...');
        console.log('📝 API: Badge data:', badgeData);
        console.log('🌐 API: Base URL from baseApi should be /api/v1/');
        
        const queryConfig = {
          url: `badges`,
          method: 'POST',
          body: badgeData,
        };
        
        console.log('⚙️ API: Full query config:', queryConfig);
        return queryConfig;
      },
      transformResponse: (response: BadgeResponse) => {
        console.log('✅ API: Badge created successfully!');
        console.log('📦 API: Response data:', response);
        return response;
      },
      transformErrorResponse: (response: any, meta, arg) => {
        console.log('❌ API: Create badge failed');
        console.log('🔍 API: Full error response:', response);
        console.log('🔍 API: Meta object:', meta);
        console.log('🔍 API: Original args:', arg);
        
        // More detailed error logging
        if (meta?.response) {
          console.log('📊 API: HTTP Status:', meta.response.status);
          console.log('📊 API: HTTP Status Text:', meta.response.statusText);
          console.log('📊 API: Response headers:', meta.response.headers);
          console.log('📊 API: Response URL:', meta.response.url);
        } else {
          console.log('⚠️ API: No response meta - likely a network error');
          console.log('⚠️ API: Possible causes:');
          console.log('   - Server is not running');
          console.log('   - Incorrect API base URL');
          console.log('   - CORS issues');
          console.log('   - Network connectivity problems');
        }
        
        // Check if it's a network error
        if (!meta?.response) {
          return {
            status: 'FETCH_ERROR',
            data: null,
            error: 'Network error: Could not connect to server. Please check if the API server is running and accessible.'
          };
        }
        
        return {
          status: meta.response.status,
          data: response,
          error: response?.message || response?.error || 'Server error occurred'
        };
      },
      invalidatesTags: ['Badges'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateBadgeMutation } = createBadgeApi;