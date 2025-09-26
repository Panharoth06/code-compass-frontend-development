import React from "react"
import { Edit, Trash2 } from "lucide-react"

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${className}`}
  >
    {children}
  </span>
)

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95 relative overflow-hidden"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-border hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 rounded-lg text-sm",
    lg: "h-12 px-8 text-lg",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

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

export default function PackagesTable({ items, onEdit, onDelete }) {
  const packageItems = items.filter((item) => item.type === "package")

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
            <TableHead className="font-semibold text-gray-900 dark:text-white">Type</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white hidden sm:table-cell text-right">
              Created
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageItems.length > 0 ? (
            packageItems.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-200 group"
              >
                <TableCell>
                  <Badge className="bg-gradient-to-r from-gray-500 to-slate-600 text-white capitalize">
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-white">{item.title}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 hidden sm:table-cell text-right">
                  {item.created}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 group-hover:scale-105 p-2"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 group-hover:scale-105 p-2"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-8 text-gray-500 dark:text-gray-400">
                No packages found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}