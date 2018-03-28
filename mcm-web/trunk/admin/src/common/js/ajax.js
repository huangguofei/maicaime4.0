/**
 * author pzh
 * date 2018-2-20 16:50
 * 重装axios
 */
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
export default function commAjax (opts, type) {
	if(!opts) return false
	var that = this
	var url = (opts.url ? (type === 'orginUrl' ? opts.url : process.env.API_ROOT + opts.url) : null)
	var params = opts.params ? opts.params : {}
	var header = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
	opts.header && Object.assign(header, opts.header)
	var httpParams = {
		method: (opts.method ? opts.method : 'GET'),
		url: url,
		headers: header
	}
	if(opts.type === 'image') {
		httpParams.data = params
	} else {
		if(opts.method.toUpperCase() === 'POST') {
			httpParams.data = qs.stringify(params)
		} else {
			httpParams.params = params
		}
	}
	/**
	 *回调
	 */
	var callbankSussess = (response) => {
		var data = response.data
		var httpCode = data.resultCode
		if(httpCode === 200) {
			opts.success(data.data)
		} else if(httpCode === 203) {
			opts.login ? opts.login(data) : null
		} else {
			Message(data.msg)
			opts.error ? opts.error(data) : null
		}
	}
	var callBankError = (response) => {
		var data = response.data
		Message(JSON.stringify(data))
		opts.error ? opts.error(data) : null
	}

	axios(httpParams).then(function (response) {
		callbankSussess(response)
	}, function (response) {
		callBankError(response)
	})
}