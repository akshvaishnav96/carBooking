import { Brand } from "../schema/brandsSchema"



async function addBrandHandler(){

        return await Brand.find({})

}
 

  export {addBrandHandler}