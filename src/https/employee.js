import * as api  from '../constants/api';

import * as http from './index';

export function check_login(){
	console.log(api.CHECK_LOGIN);
	return http.post({
		url:api.CHECK_LOGIN
	});
}

export function login(obj){
	return http.post({
		url:api.LOGIN,
		data:obj
	})
}

export function get_employee_list( ){
	return http.post({
		url:api.GET_EMPLOYEE_LIST,
	})
}
export function get_Time( ){
	return http.post({
		url:api.GET_TIME,
	}) 
}

export function get_employee_kaohe(obj){
	return http.post({
		url:api.GET_EMPLOYYEE_KAOHE,
		data:obj||{}
	})
}
export function submit_employee_kaohe(obj){
	return http.post({
		url:api.SUBMIT_EMPLOYEE_KAOHE,
		data:obj||{}
	})
}



