export const IsFetchingLoader = () => {
    return (
        [...Array(3)].map((_, i) => (
            <tr key={`skeleton-${i}`} className="animate-pulse">
                <td className="p-3 sm:p-4">
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-12" />
                </td>
                <td className="p-3 sm:p-4">
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-40 mb-2" />
                    <div className="flex gap-2">
                        <div className="h-3 w-10 bg-gray-200 dark:bg-slate-700 rounded" />
                        <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
                    </div>
                </td>
                <td className="p-3 sm:p-4">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
                </td>
            </tr>
        ))
    )
}