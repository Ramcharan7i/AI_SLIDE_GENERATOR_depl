
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Layout from "../components/layout/Layout";
import GenerateForm from "../components/form/GenerateForm";

function Dashboard(){

  return(
    <Layout>
        <Navbar/>
        <GenerateForm/>
    </Layout>
  )
}

export default Dashboard;
