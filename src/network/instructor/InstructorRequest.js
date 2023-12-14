import { request } from '../HttpUtil'

let instance = request();

let DicRequest = {
  listEnteryears() {
    return instance.post('/common/listEnteryears');
  },
  listAcademicyearids() {
    return instance.post('/common/listAcademicyearids?tableName=COMON&fieldName=ACADEMIC');
  },
  queryPageData(param) {
    let url = "/instructor/queryVinstructor?";
    for (let pro in param) {
      if (param[pro] == null || param[pro] == '') {
        continue;
      }
      url = url + pro + '=' + param[pro] + '&';
    }
    console.log(url);
    return instance.post(url);
  },
  queryInstructorById(id) {
    console.log(id);
    let url = "/instructor/queryInPrimaryKey/" + id;
    console.log(url);
    return instance.post(url);
  },
  updateInstructor(param) {
    let url = "/instructor/updateInstructor?"
    for (let pro in param) {
      if (param[pro] == null || param[pro] == '') {
        continue;
      }
      url = url + pro + "=" + param[pro] + "&";
    }
    console.log(url);
    return instance.put(url, {
      headers: {
        'Content-Type': 'appLication/x-www-form-urlencoded'
      }
    });
  },
  queryInstructorClass(instructorId) {
    return instance.post("/instructor/queryIcPrimaryKey/" + instructorId);
  },
  addInstructor(param) {
    let url = "/instructor/addInstructor?"
    for (let pro in param) {
      if (param[pro] == null || param[pro] == '') {
        continue;
      }
      url = url + pro + "=" + param[pro] + "&";
    }
    console.log(url);
    return instance.post(url, {
      headers: {
        'Content-Type': 'appLication/x-www-form-urlencoded'
      }
    })
  },
  addInstructorClass(instructorId, classId, startAcademicYearId,
    startTerm, termCount) {
    let url = "/instructor/addInstructorClass?instructorId=" + instructorId;
    url = url + "&classId=" + classId;
    url = url + "&startAcademicYearId=" + startAcademicYearId;
    url = url + "&startTerm=" + startTerm;
    url = url + "&termCount=" + termCount;
    console.log("********************");
    console.log(url);
    return instance.post(url);
  },
  deletInstructor(id) {
    return instance.delete("/instructor/delete/" + id);
  },
  deletInstructorClass(id) {
    return instance.delete("/instructor/deleteIc/" + id);
  }

}

export default DicRequest;

