import { ReportRequest, ReportResponse } from '@/lib/types/discussion/discussionResponse';
import { baseApi } from '../baseApi';

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation<ReportResponse, ReportRequest>({
      query: (reportData) => ({
        url: `/comments/report`,
        method: 'POST',
        body: reportData,
      }),
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Report", id: commentId },
      ],
    }),
  }),
});

export const { useCreateReportMutation } = reportApi;