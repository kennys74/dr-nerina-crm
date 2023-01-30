import React from "react"
import Breadcrumbs from "/src/components/Common/Breadcrumb"
import ClientList from "./client-list"

function Dashboard() {
  document.title = "Dashboard | Dr Nerina Wilkinson & Associates"

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
        <ClientList />
      </div>
    </div>
  )
}

export default Dashboard
