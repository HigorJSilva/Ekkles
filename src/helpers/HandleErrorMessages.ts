import * as _ from "lodash";

export function handleErrorMessage (erros: Array<any>){
    var grouped = _.groupBy(erros, function(item: {param: string}){
        return item.param;
      });
      var errorsArray = _.each(grouped, function(value: any, key: any, list: any){
          let vava: Array<any> = [];
          value.forEach((element:{msg: string}) => {
            vava.push(element.msg)
          });
         
        return list[key] = vava;
      });
      return errorsArray;
}