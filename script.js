/*
function verileriYukle(){
  fetch("https://sozluk.gov.tr/atasozu")
  .then((gelen) => gelen.json())
  .then((veri) => console.log(veri))
}
*/
const sonuc=document.getElementById("sonuc");
const aramaListesi=document.getElementById("aramaListesi");
const aramaKutusu=document.getElementById("aramaKutusu");

const anahtarKelimeler=[];
const sozler=[];

verileriYukle();

async function verileriYukle(){
  const gelen=await fetch("https://sozluk.gov.tr/atasozu");
  let veri=await gelen.json();

  veri.forEach(eleman => {
    anahtarKelimeler.push(eleman.anahtar);
    sozler.push(eleman.sozum);
  })


const birlesmisKelimeler = [...new Set(anahtarKelimeler)];//tekrar eden kelimeleri teke düşürmek

let sayac=0;
birlesmisKelimeler.sort(() => Math.random() - 0.5);/* kullanıcıya önerilen ilk 5 kelimenin sayfa yeniledikçe değişmesini sağlamak*/
birlesmisKelimeler.forEach(kelime => {
  if(sayac<5){
    const yeni=document.createElement("option");
    aramaListesi.appendChild(yeni);
    yeni.value=kelime;
    }
    sayac++;
})
}
//input kısmına girilen kelimeyi parametre olarak alma
aramaKutusu.addEventListener("input",(e) => sonuclariAra(e.target.value));

function sonuclariAra(arananKelime){
  sonuc.innerHTML="";//sonuçları sıfırlamak için
  //RegExp ile metin arama, "gi" büyük küçük harfin fark etmemesi için
  let aramaKurali = new RegExp(arananKelime, 'gi');
  let eslesenler=sozler.filter(soz => aramaKurali.test(soz));
  
  if(arananKelime.length < 2){
    eslesenler=[];
  }

  eslesenler.forEach(es => {
    
    const siradakiSonuc=document.createElement("li");
    sonuc.appendChild(siradakiSonuc);
    siradakiSonuc.innerHTML=es;
    
  })
}

