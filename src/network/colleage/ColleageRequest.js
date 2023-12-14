import {request} from '../HttpUtil'

let instance = request();

let DicRequest={

    queryAll(){
      return instance.post('/colleage/query?page=1&rows=10',{
      }) 
    },
    queryDataById(id){
      return instance.post('/colleage/queryPrimaryKey/'+id);
    },
    addData(params){
      if(params.id){
        delete params.id;
    }
      let url="/colleage/add?"
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
      return instance.delete('/colleage/delete/'+id);
    },
    updataData(params){
      let url="/colleage/updateColleage?"
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
    listColleageAsTree(){
      return instance.post('/colleage/listAstree');
    },
    queryColleages(){
      return instance.post('/colleage/queryColleages')
    },
    listClassTree(){
      return instance.post('/colleage/ColleageClassTree');
    },
    ListCEATree(){
      return instance.post('/colleage/ListCEATree');
    },
}

export default DicRequest;