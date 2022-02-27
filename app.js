const app = Vue.createApp({
    data() {
        return {
            title : "Kopta",
            search : "",
            activeonly : true,
            lines : [   {   num : "1",
                            label : Math.random().toString(36).substr(2, 8).toUpperCase(),
                            status : true }
                    ],
        }
    },
    computed: {
        activeLines: function() {
            var activeonly = this.activeonly;    
            var search = this.search;    

            return _.pickBy(this.lines, function(u) {       
                var v = (activeonly) ? u.status : true;
                if(v && search != '' && search != undefined){
                    v = u.label.includes(search);
                }  

                return v;
            });
        }
    },
    methods: {
        add: function(){
            var num = this.lines.length + 1;
            var n = {   num : num,
                        label : Math.random().toString(36).substr(2, 8).toUpperCase(),
                        status : true   };
            this.lines.push(n);
        },
        del: function(idx){
            this.lines[idx].status = false;
        },
        ret: function(idx){
            this.lines[idx].status = true;
        }
    }
});

var BulleInfo = {
    template : `<div class="flexpx grey darken-2 bulle t-center" style="--f:100">
                    <div>{{line.label}}</div>
                </div>`,
    props : { line  : {   type : Object,
                        required : true,
                        default : [] }
    }
}

app.component('bulleinfo', BulleInfo);

app.mount('#app') ;