import bcrypt from 'bcrypt';

export const passwordGenerate=(password)=>{
    try {
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(password,salt);
        return hashedPassword
    } catch (error) {
        return "Password Bcrypt Error";
    }
}


export const passwordCompare=(password,confirmpassword)=>{
    try {
        const hashedPassword=bcrypt.compare(password,confirmpassword);
        return hashedPassword
    } catch (error) {
        return "Password Bcrypt Error";
    }
}
