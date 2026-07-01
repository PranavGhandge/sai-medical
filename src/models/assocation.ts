import Medicine from "./medicine.model";
import Category from "./category.model";
import StockTransaction from "./stock.model";
import SaleItem from "./sale_item.model";
import Sale from "./sale.model";


Category.hasMany(Medicine,{
    foreignKey:"category_id",
    as:"medicines"
});


Medicine.belongsTo(Category,{
    foreignKey:"category_id",
    as:"category"
});

Medicine.hasMany(StockTransaction,{
 foreignKey:"medicine_id",
 as:"stock_history"
})


StockTransaction.belongsTo(Medicine,{
 foreignKey:"medicine_id",
 as:"medicine"
})


Sale.hasMany(SaleItem, {
    foreignKey:"sale_id",
    as:"items"
});


// SaleItem -> Sale
SaleItem.belongsTo(Sale, {
    foreignKey:"sale_id",
});



// SaleItem -> Medicine
SaleItem.belongsTo(Medicine, {
    foreignKey:"medicine_id",
    as:"medicine"
});