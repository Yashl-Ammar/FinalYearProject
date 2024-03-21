const Report=require('../Models/Report')

const addReportByClient=async(req,res)=>{
    const{title,details,links,type}=req.body

    const report=new Report({
        client:req.user._id,
        title,
        details,
        links,
        type
    })

    const newReport=await report.save()

    res.send(newReport)
}
const addReportByfreelancer=async(req,res)=>{
    const{title,details,links,type}=req.body

    const report=new Report({
        freelancer:req.user._id,
        title,
        details,
        links,
        type
    })

    const newReport=await report.save()

    res.send(newReport)
}
const viewReports=async(req,res)=>{
    const reports=await Report.find({})
    if(!reports) return res.status(404).send("Reports Not Found")
    res.send(reports)
}
const viewSpecificReport=async(req,res)=>{
    const id =req.params.reportId
    const report=await Report.findById(id)
    if(!report) return res.status(404).send("Report Not Found")
    res.send(report)
}
const resolveReport=async(req,res)=>{
    const id =req.params.reportId
    const report=await Report.findById(id)
    if(!report) return res.status(404).send("Report Not Found")
    report.status="Resolved"
    const newReport=await report.save()
    res.send(newReport)
}
const deleteReport=async(req,res)=>{
    const id =req.params.reportId
    const report=await Report.findByIdAndDelete(id)
    if(!report) return res.status(404).send("Report Not Found")
    res.send("Report Deleted Successfully")
}
const updateReport=async(req,res)=>{
    const id =req.params.reportId
    const{title,description,details}=req.body
    const report=await Report.findById(id)
    if(!report) return res.status(404).send("Report Not Found")
    report.title=title
    report.description=description
    report.details=details
    report.status="Resolved"
    const newReport=await report.save()
    res.send(newReport)
}
module.exports={
    addReportByClient,
    addReportByfreelancer,
    viewReports,
    viewSpecificReport,
    resolveReport,
    deleteReport,
    updateReport
}