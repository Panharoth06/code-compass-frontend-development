import React from "react"
import ProblemsTable from "./problem-table/ProblemsTable"
// import BadgesTable from "./badge-table/BadgesTable"
// import PackagesTable from "./package-table/PackagesTable"
import AdminResponsesTable from "./admin-response/AdminResponsesTable"

export default function AllItemsTable({ items, filter, adminResponses, onEdit, onDelete }) {
  if (filter === "admin") {
    return <AdminResponsesTable adminResponses={adminResponses} />
  }

  if (filter === "problem") {
    return <ProblemsTable items={items} onEdit={onEdit} onDelete={onDelete} />
  }

  // if (filter === "badge") {
  //   return <BadgesTable items={items} onEdit={onEdit} onDelete={onDelete} />
  // }

  // if (filter === "package") {
  //   return <PackagesTable items={items} onEdit={onEdit} onDelete={onDelete} />
  // }

  // All items table
  return (
    <div className="space-y-6">
      <ProblemsTable items={items} onEdit={onEdit} onDelete={onDelete} />
      {/* <BadgesTable items={items} onEdit={onEdit} onDelete={onDelete} />
      <PackagesTable items={items} onEdit={onEdit} onDelete={onDelete} /> */}
    </div>
  )
}