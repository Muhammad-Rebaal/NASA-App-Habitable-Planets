const parse = require("csv-parse");
const fs = require("fs")



let results = []

fs.createReadStream("kepler_data.csv")
.pipe(parse({
    comment:"#",
    column:true
}))
.on("data", (data) => {
    results.push(data)
}).on("error", (err) => {
    console.log(err)
}).on("end",()=>{
    console.log(results)
    console.log("done")
})
