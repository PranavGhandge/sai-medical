import PDFDocument from "pdfkit";
import { FastifyReply } from "fastify";

import Sale from "../models/sale.model";
import SaleItem from "../models/sale_item.model";
import Medicine from "../models/medicine.model";


class InvoiceService {


async generateInvoice(
sale_id:string,
reply:FastifyReply
){


const sale =
await Sale.findOne({

where:{
    id:sale_id
},


include:[

{

model:SaleItem,

as:"items",


include:[

{

model:Medicine,

as:"medicine",

attributes:[
"name",
"company"
]

}

]

}

]

});



if(!sale){

throw new Error(
"Sale Not Found"
);

}



const doc = new PDFDocument();



reply.header(
"Content-Type",
"application/pdf"
);



reply.header(
"Content-Disposition",
`inline; filename=invoice-${sale_id}.pdf`
);



// PDF stream
doc.pipe(reply.raw);



// Invoice Header

doc
.fontSize(20)
.text(
"Medical Store Invoice",
{
align:"center"
}
);



doc.moveDown();



doc
.fontSize(12)
.text(
`Customer Name : ${sale.customer_name}`
);



doc.text(
`Phone : ${sale.customer_phone || "-"}`
);



doc.text(
`Date : ${sale.sale_date}`
);



doc.moveDown();



doc.text("----------------------------");


doc.text(
"Medicine Details"
);


doc.text("----------------------------");



let total = 0;



sale.items.forEach((item:any)=>{


const amount =
Number(item.quantity) *
Number(item.price);



total += amount;



doc.text(
`
Medicine : ${item.medicine.name}

Company : ${item.medicine.company}

Quantity : ${item.quantity}

Price : ${item.price}

Amount : ${amount}

----------------------------
`
);


});



doc.fontSize(14)
.text(
`Total Amount : ${total}`
);



// important
doc.end();


return reply;


}



}



export default new InvoiceService();