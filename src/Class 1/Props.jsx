import Car from "./Components/Car"

export default function PropsComponent(){
    let details=[
        {
            pname:"Kia Seltos",
            pprice:"12 Lakh",
            pmodel:"HTK Plus",
            pratings:9.0
        },
        {
            pname:"Honda City",
            pprice:"19 Lakh",
            pmodel:"ZX Plus",
            pratings:10.0
        },
        {
            pname:"Polo GT",
            pprice:"15 Lakh",
            pmodel:"GT",
            pratings:10.0
        },
        {
            pname:"Virtus",
            pprice:"15 Lakh",
            pmodel:"Sport",
            pratings:9.5
        }
    ]
    return(
        <>
            {
                details.map((el)=>(
                    // This is how we transfer the data.
                    <Car name={el.pname} model={el.pmodel} price={el.pprice} ratings={el.pratings}/>
                ))
            }
        </>
    )
}