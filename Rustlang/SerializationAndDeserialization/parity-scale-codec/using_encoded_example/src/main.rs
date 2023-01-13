fn main() {
    let res_n = Info::Age(0);
    println!("res_n.encode() = {:?}", res_n.encode(1000));

    let p = res_n.using_encoded(
        |x| x, 110);
    println!("p =  {:?}", p);
}

enum Info<T> {
    Age(T),
}

impl<T> Info<T> {
    fn encode(&self, arg: T) -> Vec<T> {
		let mut r: Vec<T>  = vec![];
        match self {
            Info::Age(_v) => r.push(arg),
        }
        r
	}

    fn using_encoded<R, F: FnOnce(Vec<T>) -> R>(&self, f: F, arg: T) -> R {
        f(self.encode(arg))
    }
}
