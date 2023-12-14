import {request} from '../HttpUtil'

let instance = request();

let DicRequest={
  listClassByEnterYearAndColleage(colleageName,enteryears){
    let url = '/class/listClassByEnterYearAndColleage?name='+colleageName;
    if(enteryears!=null){
      url=url+"&enteryears="+enteryears;
    }
    console.log(url);
    return instance.post(url);
  },

    queryAll(){
      return instance.post('/class/pageList?page=1&rows=10',{
      }) 
    },
    queryDataById(id){
      return instance.post('/class/queryPrimaryKey/'+id);
    },
    addData(params){
      let url="/class/addClass?"
      for(let pro in params){
        url = url+pro+"="+params[pro]+"&";
      }
      console.log(url);
      return instance.post(url,{
        headers:{
          'Content-Type':'appLication/x-www-form-urlencoded'
        }
      })
    },
    deleteData(id){
      return instance.delete('/class/delete/'+id);
    },
    updataData(params){
      let url="/class/updateClass?"
      for(let pro in params){
        url = url+pro+"="+params[pro]+"&";
      }
      console.log(url);
      return instance.put(url,{
        headers:{
          'Content-Type':'appLication/x-www-form-urlencoded'
        }
      })
    },
    addOrUpdataData(param){
      if(param.id && param.id>0){
        return this.updataData(param);
      }else{
        return this.addData(param);
      }
    },
    queryPageData(param){
      let url="/class/pageList?";
      for(let pro in param){
        if(param[pro]==null || param[pro]==''){
          continue;
        }
        url=url+pro+'='+param[pro]+'&';
      }
      console.log(url);
      return instance.post(url);
    },
    listClassByInstructorId(instructorId){
      let url ="/class/listClassByInstructorId/"+instructorId
      console.log(url);
      return instance.post(url);
    },
    
    
}

export default DicRequest;