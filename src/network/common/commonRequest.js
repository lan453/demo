import { request } from '../HttpUtil'

let instance = request();

let DicRequest = {
    listFestival() {
        let url = '/recordadvice/listFestival';
        return instance.post(url);
    },
    selectByPrimaryKey(id){
        let url = '/recordadvice/selectByPrimaryKey/?id='+id;
        return instance.post(url);
    },
    queryFestivalReg(param) {
        let url = "/destination/queryFestivalReg/?";
        for (let pro in param) {
          url = url + pro + '=' + param[pro] + '&';
        }
        console.log(url);
        return instance.post(url);
      },
      updateRegDate(param){
        let url = "/recordadvice/updateRegDate/?";
        for (let pro in param) {
          url = url + pro + '=' + param[pro] + '&';
        }
        console.log(url);
        return instance.post(url);
      }
}
export default DicRequest;