var collectProductsTemplate = require('./collect_products.njk');
var collectproducts = null;
var collection_collects = null;

function renderPage(jqObject, collectionId, settings) {
    collectproducts = new HeyShop.Products();
    collectproducts.list({page_size: 6, collection: collectionId})
    .then(function(data) {
        collection_collects = data;
        jqObject.append(HeyShop.njkenv.renderString(
            collectProductsTemplate, {
                settings_data: settings,
                collection_product: data,
                selector: jqObject,
                collection_id: collectionId,
                next: collectproducts.next
            }
        ));
    })
    .catch(function(error) {
        HeyShop.toast.popupToast(error, 1500);
    });
}

function renderNext(jqObject, collectionId, settings) {
    if (collectproducts) {
        collectproducts.listNext()
        .then(function(data) {
            collection_collects = collection_collects.concat(data);
            jqObject.append(HeyShop.njkenv.renderString(
                collectProductsTemplate, {
                    settings_data: settings,
                    collection_product: data,
                    selector: jqObject,
                    collection_id: collectionId,
                    next: collectproducts.next
                }
            ));
        })
        .catch(function(error) {
            HeyShop.toast.popupToast(error, 1500);
        });
    }
}

function quickview(product) {
    Rush.productQuickview.open(product, collection_collects);
}

module.exports = {
    renderPage: renderPage,
    renderNext: renderNext,
    quickview: quickview
}
