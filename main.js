/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 * Tulis seluruh kode JavaScript kamu di sini.
 */

// TODO [Basic] Buat variabel array untuk menyimpan semua data transaksi, contoh: let transactions = []
// TODO [Basic] Buat fungsi untuk menghasilkan ID unik secara otomatis, contoh: gunakan +new Date()

/**
 * ========================================================
 * Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
 * ========================================================
 */
// TODO [Basic] Ambil elemen kontainer incomeList dan expenseList dari DOM

/**
 * TODO [Basic]:
 * Buat fungsi untuk menampilkan (render) semua transaksi ke layar:
 *  - Kosongkan kontainer terlebih dahulu sebelum mengisi ulang
 *  - Gunakan perulangan, buat setiap elemen kartu dengan document.createElement()
 *  - Pastikan setiap elemen memiliki atribut data-testid yang sesuai (lihat panduan di rubrik)
 *  - Masukkan kartu ke kontainer yang tepat: income → incomeList, expense → expenseList
 */

// TODO [Basic] Tambahkan event listener 'submit' pada form, panggil e.preventDefault() di dalamnya
// TODO [Basic] Di dalam handler submit, ambil nilai input lalu tambahkan sebagai objek transaksi baru ke array

/**
 * TODO [Skilled]:
 * Tambahkan validasi input sebelum menyimpan data:
 *  - Tampilkan alert() dan hentikan proses jika judul kosong
 *  - Tampilkan alert() dan hentikan proses jika nominal kurang dari 1
 */

/**
 * TODO [Advanced]:
 * Setiap kali data transaksi berubah, perbarui Panel Dasbor:
 *  - Hitung total pemasukan, total pengeluaran, dan saldo (pemasukan - pengeluaran)
 *  - Tampilkan hasilnya ke elemen yang sesuai di HTML
 */

/**
 * ========================================================
 * Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Data transaksi disimpan ke localStorage menggunakan JSON.stringify(), dan dimuat kembali saat halaman dibuka menggunakan JSON.parse().
 *  - Tombol "Hapus" berfungsi: transaksi yang dihapus langsung hilang dari layar dan dari localStorage.
 */

/**
 * TODO [Skilled]:
 * Tombol "Edit" berfungsi: saat ditekan, formulir (#transactionForm) secara otomatis terisi dengan data transaksi yang dipilih.
 *  - Pengguna dapat mengubah data lalu menyimpan perubahan.
 *  - Formulir kembali ke mode "Tambah" setelah pembaruan selesai.
 */

/**
 * TODO [Advanced]:
 * Gunakan Custom Event sebagai penghubung antara perubahan data dan pembaruan tampilan:
 *  - Kirim sinyal dengan document.dispatchEvent(new Event('transaction:updated')) setiap kali data berubah
 *  - Pasang satu listener untuk event tersebut yang memanggil fungsi render dan update dasbor
 */

/**
 * ========================================================
 * Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Tambahkan tombol "Ubah Tipe" pada setiap kartu transaksi:
 *  - Saat diklik, ubah tipe transaksi: 'income' → 'expense' atau 'expense' → 'income'
 *  - Simpan perubahan ke localStorage dan perbarui tampilan
 */

/**
 * TODO [Skilled]:
 * Tambahkan event listener 'input' pada kolom pencarian:
 *  - Filter array transaksi berdasarkan kecocokan kata kunci dengan judul transaksi
 *  - Tampilkan hanya transaksi yang judulnya mengandung kata kunci tersebut
 */

/**
 * TODO [Advanced]:
 * Pastikan fitur pencarian berjalan dengan baik di semua kondisi:
 *  - Saat kolom pencarian dikosongkan, tampilkan kembali seluruh daftar transaksi
 */

// Array variable untuk menyimpan data transaksi
let transactions = [];

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");

// Fungsi untuk membuat ID unik
function createIdTransaction() {
  return +new Date();
}

// Mencari index transaksi berdasarkan ID
function findIndexTransaction(indexTransaction) {
  for (const index in transactions) {
    if (transactions[index].id == indexTransaction) {
      return index;
    }
  }
}

// Menyimpan data transaksi ke localStorage
function saveDataTransaction() {
  const transactionStorage = JSON.stringify(transactions);
  localStorage.setItem("TRANSACTION_KEY", transactionStorage);
}

// Mengambil data transaksi dari localStorage dan menampilkannya ke layar
function loadDataFromTransaction() {
  const dataTransactionStorage = localStorage.getItem("TRANSACTION_KEY");
  let dataTransactions = JSON.parse(dataTransactionStorage);

  if (dataTransactions !== null) {
    for (const transaction of dataTransactions) {
      transactions.push(transaction);
    }
  }
  renderTransaction();
}

// Fungsi untuk membuat kartu transaksi
function makeTransaction(transactionObject) {
  const cardTransaction = document.createElement("div");
  cardTransaction.setAttribute("data-testid", "transactionItem");

  const transactionItemTitle = document.createElement("h3");
  transactionItemTitle.setAttribute("data-testid", "transactionItemTitle");
  transactionItemTitle.innerText = transactionObject.title;

  const transactionItemAmount = document.createElement("p");
  transactionItemAmount.setAttribute("data-testid", "transactionItemAmount");
  transactionItemAmount.innerText = `Nominal: ${formatRupiah(transactionObject.amount)}`;
  transactionItemAmount.setAttribute("data-testid", "transactionItemAmount");

  const transactionItemDate = document.createElement("p");
  transactionItemDate.setAttribute("data-testid", "transactionItemDate");
  transactionItemDate.innerText = `Tanggal: ${transactionObject.date}`;

  const transactionItemType = document.createElement("p");
  transactionItemType.setAttribute("data-testid", "transactionItemType");

  if (transactionObject.type == "income") {
    transactionItemType.innerText = "Tipe: Pemasukan";
  } else {
    transactionItemType.innerText = "Tipe: Pengeluaran";
  }

  const divButton = document.createElement("div");
  const editTypeButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  editTypeButton.setAttribute("data-testid", "transactionItemEditTypeButton");
  editButton.setAttribute("data-testid", "transactionItemEditButton");
  deleteButton.setAttribute("data-testid", "transactionItemDeleteButton");
  editTypeButton.innerText = "Ubah Tipe";
  editButton.innerText = "Edit";
  deleteButton.innerText = "Hapus";

  divButton.append(editTypeButton, editButton, deleteButton);
  cardTransaction.append(transactionItemTitle, transactionItemAmount, transactionItemDate, transactionItemType, divButton);

  // Mengubah tipe transaksi dan memuat ulang tampilan
  editTypeButton.addEventListener("click", function () {
    if (transactionObject.type == "income") {
      // merubah data transaksi dan memuat ulang tampilan
      transactionObject.type = "expense";
      renderTransaction();
      saveDataTransaction();
    } else {
      // merubah data transaksi dan memuat ulang tampilan
      transactionObject.type = "income";
      renderTransaction();
      saveDataTransaction();
    }
  });

  // Mengisi form dengan data transaksi yang dipilih untuk diedit
  editButton.addEventListener("click", function () {
    document.getElementById("transactionFormTitleInput").value = transactionObject.title;
    document.getElementById("transactionFormAmountInput").value = transactionObject.amount;
    document.getElementById("transactionFormDateInput").value = transactionObject.date;
    document.getElementById("transactionFormTypeSelect").value = transactionObject.type;
    document.getElementById("transactionId").value = transactionObject.id;

    document.getElementById("updateButton").removeAttribute("hidden");
    document.getElementById("simpanButton").setAttribute("hidden", true);
  });

  // Menghapus data transaksi dan memuat ulang tampilan
  deleteButton.addEventListener("click", function () {
    const indexTransaction = findIndexTransaction(transactionObject.id);
    transactions.splice(indexTransaction, 1);

    renderTransaction();
    saveDataTransaction();
  });

  return cardTransaction;
}

// Fungsi untuk menampilkan semua transaksi ke layar
function renderTransaction() {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  for (const transaction of transactions) {
    const transactionElement = makeTransaction(transaction);
    if (transaction.type == "income") {
      incomeList.appendChild(transactionElement);
    } else {
      expenseList.appendChild(transactionElement);
    }
  }

  document.getElementById("balance").innerText = formatRupiah(hitungSaldo());
  document.getElementById("income").innerText = formatRupiah(totalIncome());
  document.getElementById("expense").innerText = formatRupiah(totalExpense());
}

function totalIncome() {
  let total = 0;

  for (const transaction of transactions) {
    if (transaction.type == "income") {
      total += Number(transaction.amount);
    }
  }
  return total;
}

function totalExpense() {
  let total = 0;

  for (const transaction of transactions) {
    if (transaction.type == "expense") {
      total += Number(transaction.amount);
    }
  }
  return total;
}

function hitungSaldo() {
  return totalIncome() - totalExpense();
}

// Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

// Menjaga pencarian tetap diterapkan setiap kali daftar transaksi dirender ulang.
const searchTransactionInput = document.getElementById("searchTransactionFormTitleInput");
const searchTransactionForm = document.getElementById("searchTransactionForm");
const renderAllTransactions = renderTransaction;

// Fungsi untuk menampilkan transaksi berdasarkan kata kunci pencarian
renderTransaction = function () {
  renderAllTransactions();

  const searchKeyword = searchTransactionInput.value.trim().toLocaleLowerCase("id");

  for (const transactionCard of document.querySelectorAll('[data-testid="transactionItem"]')) {
    const transactionTitle = transactionCard.querySelector('[data-testid="transactionItemTitle"]').innerText.toLocaleLowerCase("id");

    transactionCard.hidden = !transactionTitle.includes(searchKeyword);
  }
};

// Menambahkan event listener untuk input pencarian dan form submit
searchTransactionInput.addEventListener("input", renderTransaction);
searchTransactionForm.addEventListener("submit", function (event) {
  event.preventDefault();
  renderTransaction();
});

// Memastikan data transaksi dimuat dari localStorage saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  if (Storage !== undefined) {
    loadDataFromTransaction();
  } else {
    alert("Browser anda tidak mendukung local storage");
  }
});

// Memproses input dan menampilkan transaksi setelah melakukan submit
document.getElementById("transactionForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const transactionTitle = document.getElementById("transactionFormTitleInput").value;
  const transactionAmount = document.getElementById("transactionFormAmountInput").value;
  const transactionDate = document.getElementById("transactionFormDateInput").value;
  const transactionType = document.getElementById("transactionFormTypeSelect").value;

  if (!transactionTitle.trim()) {
    alert("Keteran belum anda isi.");
    return;
  } else if (transactionAmount < 1) {
    alert("Nominal: (min 1 Rupiah).");
    return;
  } else if (!transactionDate.trim()) {
    alert("Tanggal belum anda masukkan.");
    return;
  }

  transactions.push({
    id: createIdTransaction(),
    title: transactionTitle,
    amount: Number(transactionAmount),
    date: transactionDate,
    type: transactionType,
  });

  // updateFinancial(transactionType);
  saveDataTransaction();
  renderTransaction();
});

// Memproses input dan menampilkan transaksi setelah melakukan update
document.getElementById("updateButton").addEventListener("click", function (event) {
  event.stopPropagation();
  const transactionId = document.getElementById("transactionId").value;
  const indexTransaction = findIndexTransaction(transactionId);

  const transactionTitle = document.getElementById("transactionFormTitleInput").value;
  const transactionAmount = document.getElementById("transactionFormAmountInput").value;
  const transactionDate = document.getElementById("transactionFormDateInput").value;
  const transactionType = document.getElementById("transactionFormTypeSelect").value;

  const transactionTarget = transactions[indexTransaction];

  transactionTarget.title = transactionTitle;
  transactionTarget.amount = transactionAmount;
  transactionTarget.date = transactionDate;
  transactionTarget.type = transactionType;

  document.getElementById("updateButton").setAttribute("hidden", true);
  document.getElementById("simpanButton").removeAttribute("hidden");

  renderTransaction();
  saveDataTransaction();
});
