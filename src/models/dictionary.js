export function dict(key){
    let dictionary = {
        "XBDM->性别": {
            value:"id",
            label:"name",
            url: "/axsfw/code/b2738d0d-0eb1-4b03-b0f6-98f509a88c8c.do"
        },
        "GJDQDM->国家地区":{
            value:"id",
            label:"name",
            url: "/axsfw/code/9ea2317c-be66-428d-b1f4-7f0f5bc5ad09.do"
        },
        "MZDM->民族":{
            value:"id",
            label:"name",
            url: "/axsfw/code/e8bdc02d-2d5b-4367-b832-cd47e6ac42c1.do"
        }
    }
    return dictionary[key];
}