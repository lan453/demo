import {request} from '../HttpUtil'

let instance = request();

let DicRequest={

    queryAll(){
      return instance.post('/major/query?page=1&rows=10',{
      }) 
    },
    queryDataById(id){
      return instance.post('/major/queryPrimaryKey/'+id);
    },
    addData(params){
    if(params.id){
        delete params.id;
    }
      let url="/major/add?"
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
      return instance.delete('/major/delete/'+id);
    },
    updataData(params){
      let url="/major/updateMajor?"
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
    listMajor(){
      return instance.post('/major/queryListMajor');
    }
}

export default DicRequest;