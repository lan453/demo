import { request } from '../HttpUtil'

let instance = request();

let DicRequest = {
    ListEnterYear(startYear) {
        let url = '/sysdic/listEnterYear?startYear=' + startYear;
        console.log(url);
        return instance.post(url);
    }

}
export default DicRequest;