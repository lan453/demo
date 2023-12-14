import { request } from '../HttpUtil'

let instance = request();

let DicRequest = {
  queryPageData(param) {
    let url = "/student/queryStudentPage/?";
    for (let pro in param) {
      if (param[pro] == null || param[pro] == '') {
        continue;
      }
      url = url + pro + '=' + param[pro] + '&';
    }
    console.log(url);
    return instance.post(url);
  },
}

export default DicRequest;

