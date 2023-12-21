class CheckOutPage{

    getBillingSave(){
        return cy.get('[onclick="Billing.save()"]')
    }

    getShippingSave(){
        return cy.get('[onclick="Shipping.save()"]')
    }

    getShipMethod(){
        return cy.get('[onclick="ShippingMethod.save()"]')
    }

    getPayMethod(){
        return cy.get('[onclick="PaymentMethod.save()"]')
    }

    getPayInfo(){
        return cy.get('[onclick="PaymentInfo.save()"]')
    }    

    getProdName(){
        return cy.get('.product-name')
    }

    getConfirmOrderSave(){
        return cy.get('[onclick="ConfirmOrder.save()"]')
    }

}

export default CheckOutPage