import request from '@/utils/request'

export const sendCode = (mobile) => {
  return async (dispatch) => {
    const res = await request.get(`/sms/codes/${mobile}`)
    console.log(res)
  }
}
