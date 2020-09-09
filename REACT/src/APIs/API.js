import axios from 'axios'


export const createUser = async (user) => {
    try {
        let res = await axios.post('http://localhost:8000/signup', {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.mail,
            password: user.pass,
            isLoggedIn: false
        })
        return res
    }
    catch (err) {
        return err
    }
}



export const verifyUser = async (user) => {
   try {
        let res = await axios.post('http://localhost:8000/signin', {
            email: user.mail,
            password: user.pass
        })
        return res
    }
    catch (err) {
        console.log('err', err.response.data)
        return err.response.data
    }


}



export const getData = async (uid) => {
    try {
        let res = await axios.get('http://localhost:8000/getData/' + uid)

        return res

    }
    catch (err) {
        return err
    }
}



export const deleteData = async (user) => {
    try {
        let res = await axios.post('http://localhost:8000/deleteData', user)
        return res
    }
    catch (err) {
        return err
    }
}



export const uploadData = async (data) => {
    try {
        let res = await axios.post('http://localhost:8000/upload', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        return res
    }
    catch (err) {
        return err
    }
}