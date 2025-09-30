import React from "react"

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${className}`}
  >
    {children}
  </span>
)

const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-auto rounded-xl border border-border">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
)

const TableHeader = ({ children }) => (
  <thead className="bg-muted/50 [&_tr]:border-b [&_tr]:border-border">{children}</thead>
)

const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>

const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b border-border transition-colors hover:bg-muted/30 ${className}`}>{children}</tr>
)

const TableHead = ({ children, className = "" }) => (
  <th
    className={`h-14 px-6 text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
  >
    {children}
  </th>
)

const TableCell = ({ children, className = "" }) => (
  <td className={`p-6 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
)

function getStatusColor(status) {
  switch (status) {
    case "Approved":
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
    case "Pending":
      return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-500"
    case "Rejected":
      return "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500"
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500"
  }
}

export default function AdminResponsesTable({ adminResponses }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
            <TableHead className="font-semibold text-gray-900 dark:text-white">Message</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminResponses.map((response, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-200"
            >
              <TableCell className="font-medium text-gray-900 dark:text-white">{response.message}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(response.status)} shadow-md`}>{response.status}</Badge>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">{response.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}