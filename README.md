# Aplikacja Modeli Dynamicznych
## Piotr Pepa

Aplikacja webowa do tworzenia, edytowania i analizowania modeli dynamicznych. Umożliwia pracę zarówno użytkownikom indywidualnym, jak i administratorom systemu.

## Stack technologiczny

- **Frontend**: React, React Router, Bootstrap 5
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Autoryzacja**: JWT (JSON Web Tokens)
- **Stylizacja**: Bootstrap + własne style

---

## Uruchamianie lokalne

### 1. Klonuj repozytorium
```bash
cd szkielety_js_react-master
```

### 2. Backend

```bash
cd backend
npm install

# Przykładowy plik .env:
#MONGO_URI=mongodb://127.0.0.1:27017/dynasim
#JWT_SECRET=supersekret
#PORT=5001

node server.js
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Aplikacja frontendowa domyślnie działa na `http://localhost:3000`, a backend na `http://localhost:5001`.

---

## Konta i role

- Po rejestracji domyślną rolą użytkownika jest `user`.
- Rola `admin` może być przypisana bezpośrednio w bazie danych (np. w MongoDB Compass) lub przez innego admina.

---

## Struktura katalogów

### `backend/`

| Katalog/Plik         | Opis |
|----------------------|------|
| `server.js`          | Punkt startowy serwera |
| `controllers/`       | Logika rejestracji, logowania, CRUD modeli i admin |
| `routes/`            | Ścieżki API: auth, admin, modele |
| `models/`            | Schematy Mongoose: User, SystemModel |
| `middleware/`        | Autoryzacja (JWT), role, obsługa błędów |
| `utils/token.js`     | Tworzenie tokenów JWT |

### `frontend/src/`

| Katalog/Plik         | Opis |
|----------------------|------|
| `App.js`             | Główna struktura aplikacji i routing |
| `index.js`           | Punkt startowy React |
| `api/`               | Zapytania do backendu (auth, modele, admin) |
| `components/`        | Komponenty wspólne (Navbar, ErrorDialog) |
| `context/`           | `AuthContext` – logowanie i stan globalny użytkownika |
| `hooks/`             | `useAuth()` – dostęp do kontekstu autoryzacji |
| `pages/`             | Widoki stron: logowanie, rejestracja, dashboard, modele, admin |
| `utils/`             | `token.js` (obsługa tokenu JWT), `validateModelForm.js` |

---

## Zabezpieczenia

- Token JWT przechowywany w `localStorage`
- Ochrona tras frontendowych na podstawie roli i autoryzacji
- Backend chroni trasy za pomocą middleware (`auth`, `requireAdmin`)

---

## Funkcje

### Użytkownicy
- Rejestracja, logowanie
- Tworzenie, edycja, podgląd i usuwanie modeli
- Zmiana hasła

### Administratorzy
- Podgląd i edycja wszystkich modeli w systemie
- Zarządzanie wszystkimi użytkownikami (rola, e-mail, usuwanie)

---

## Walidacje

- Hasła sprawdzane po stronie serwera (min. 6 znaków, litera, cyfra, bez spacji)
- Walidacja formularza modelu (zmienne, równania, parametry)

---
## Testy backendu w postmanie

![testy w postmanie](image-15.png)

- rejestracja
![poprawna rejestracja](image-1.png)
![uzytkownik juz istnieje](image.png)
![niewystarczajace haslo przy rejestracji](image-2.png)

- logowanie
![poprawne logowanie](image-3.png)
![bledne dane logowania](image-4.png)

- informacje o sobie
![info o sobie](image-5.png)

- update uzytkownika
![zmiana swojego hasla](image-7.png)
![bledne aktualne haslo](image-10.png)
![niewystarczajace nowe haslo](image-11.png)

- proby zmian innych bez posiadania uprawnien admina
![proba zmiany innego uzytkownika niebedac adminem](image-6.png)
![proba usuniecia innego uzytkownika niebedac adminem](image-8.png)
![lista uzytkownikow niebedac adminem](image-9.png)

- zmiany innych posiadajac uprawnienia admina
![lista uzytkownikow](image-16.png)
![poprawna zmiana maila uzytkownika jako admin](image-13.png)
![nieudana zmiana bo uzytkownik o takim mailu istnieje](image-12.png)
![usuniecie uzytkownika jako admin](image-14.png)