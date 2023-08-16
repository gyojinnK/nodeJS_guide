const M = {
    v: "V",
    f: function () {
        console.log(this.v);
    },
};

// mpart.js 내에 모듈 M을 외부에서 사용할 수 있다는 뜻
module.exports = M;
