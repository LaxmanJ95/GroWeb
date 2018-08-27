import { Subject }    from 'rxjs/Subject';


export class SessionDataService
{
    message:String;
    static instance:SessionDataService;
    static isCreating:Boolean = false;
    data={};
 
    constructor() {
        if (!SessionDataService.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
    }
    static init(){
        return this.getInstance();
    }
    static getInstance() {
        if (SessionDataService.instance == null) {
            SessionDataService.isCreating = true;
            SessionDataService.instance = new SessionDataService();
            SessionDataService.isCreating = false;
        }
 
        return SessionDataService.instance;
    }
    setData(key,value){
        //alert(key)
        this.data[key]=value;
    }
    getData(key){
        return this.data[key];
    }
    setMessage(msg:String) {
        this.message = msg;
        console.log(this.message);
    }
 
    getMessage() {
        return this.message;
        //console.log(message);
    }
    setObject (key, valueObj){
        localStorage.setItem(key,valueObj);
    }
    getObject(key){
        return localStorage.getItem(key);
    }


    private totalCartItemCountSource = new Subject<string>();
    totalCartItemCount$ = this.totalCartItemCountSource.asObservable();

    updateTotalCartItemsCount(totalStr:string){
        this.totalCartItemCountSource.next(totalStr);
    }

    private wishListActive = new Subject<string>();
    wishList$ = this.wishListActive.asObservable();

    updateWishListActive(totalStr:string){
        this.wishListActive.next(totalStr);
    }

    private totalWishListCount = new Subject<string>();
    totalCount$ = this.totalWishListCount.asObservable();

    updateWishListCount(totalStr:string){
        this.totalWishListCount.next(totalStr);
    }
    clear(){
        this.data={};
    }

}