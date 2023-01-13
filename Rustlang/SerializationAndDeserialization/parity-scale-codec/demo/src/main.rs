use parity_scale_codec::{Encode, Decode};
use parity_scale_codec_derive::{Encode, Decode};

#[derive(Debug, PartialEq, Encode, Decode)]
enum EnumType {
	#[codec(index = 15)]
	A,
	B(u32, u64),
	C {
		a: u32,
		b: u64,
	},
}

fn main() {
    println!("Hello, world!");

    let a = EnumType::A;
    let b = EnumType::B(1, 2);
    let b_1 = EnumType::B(1, 2);
    let c = EnumType::C { a: 1, b: 2 };

    using_encoded(a, b, c);
    b1_encode_decode(b_1);
}

fn using_encoded(a: EnumType, b: EnumType, c: EnumType) {
    a.using_encoded(|ref slice| {
        assert_eq!(slice, &b"\x0f");
    });

    b.using_encoded(|ref slice| {
        assert_eq!(slice, &b"\x01\x01\0\0\0\x02\0\0\0\0\0\0\0");
    });

    c.using_encoded(|ref slice| {
        assert_eq!(slice, &b"\x02\x01\0\0\0\x02\0\0\0\0\0\0\0");
    });

    let mut da: &[u8] = b"\x0f";
    assert_eq!(EnumType::decode(&mut da).ok(), Some(a));

    let mut db: &[u8] = b"\x01\x01\0\0\0\x02\0\0\0\0\0\0\0";
    assert_eq!(EnumType::decode(&mut db).ok(), Some(b));

    let mut dc: &[u8] = b"\x02\x01\0\0\0\x02\0\0\0\0\0\0\0";
    assert_eq!(EnumType::decode(&mut dc).ok(), Some(c));

    let mut dz: &[u8] = &[0];
    assert_eq!(EnumType::decode(&mut dz).ok(), None);
}

fn b1_encode_decode(b: EnumType) {
    let b_encode = b.encode();
    println!("b_encode = {:?}", b_encode);  // [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
    
    let b_decode = EnumType::decode(&mut &b_encode[..]).unwrap();
    println!("b_decode = {:?}", b_decode);  // B(1, 2)
}
