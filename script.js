// let contacts = [
//     {
//         id: "3ea21f49-47d4-4e5b-b8ca-1376940c381d",
//         firstName: "John",
//         lastName: "Smith",
//         email: "john@example.com",
//         linkedInProfile: "https://www.linkedin.com/in/john-smith-0988b328b/",
//         phoneNumber: "+1 (555) 123-4567"
//     },
//     {
//         id: "7b3c8d12-9a6f-4c27-8e5a-65f91d72a895",
//         firstName: "Emily",
//         lastName: "Jones",
//         email: "emily@example.com",
//         linkedInProfile: "https://www.linkedin.com/in/emily-jones-7654a1b1/",
//         phoneNumber: "+1 (555) 123-4567"
//     },
//     {
//         id: "a2b1c3d4-5678-4e9f-abc1-234567890def",
//         firstName: "Michael",
//         lastName: "Davis",
//         email: "michael@example.com",
//         linkedInProfile: "https://www.linkedin.com/in/michael-davis-987654321/",
//         phoneNumber: "+1 (555) 123-4567"
//     }
// ];

class Storage {
    get() {
        const contacts = localStorage.getItem("contacts");
        if (!contacts) return [];
        return JSON.parse(contacts);
    }

    add(contact) {
        const existingContacts = this.get();
        existingContacts.push(contact);
        this.setContacts(existingContacts);
    }

    delete(id) {
        const existingContacts = this.get();
        const keptContacts = existingContacts.filter(
            (contact) => contact.id !== id
        );
        this.setContacts(keptContacts);
    }

    setContacts(updatedContacts) {
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    }
}

const storage = new Storage();

class ContactsListApp {
    static tableBody = document.querySelector(".contacts");

    deleteContact = (id) => {
        storage.delete(id);
        this.createContacts();
    };

    addContact = (contact) => {
        storage.add(contact);
        this.createContacts();
    };

    getAll() {
        return storage.get();
    }

    createContact = ({
        id,
        firstName,
        lastName,
        email,
        linkedInProfile,
        phoneNumber
    }) => {
        const tr = document.createElement("tr");

        const idTd = document.createElement("td");
        idTd.innerText = id;
        tr.appendChild(idTd);

        const firstNameTd = document.createElement("td");
        firstNameTd.innerText = firstName;
        tr.appendChild(firstNameTd);

        const lastNameTd = document.createElement("td");
        lastNameTd.innerText = lastName;
        tr.appendChild(lastNameTd);

        const emailTd = document.createElement("td");
        emailTd.innerText = email;
        tr.appendChild(emailTd);

        const linkedInProfileTd = document.createElement("td");
        linkedInProfileTd.innerText = linkedInProfile;
        tr.appendChild(linkedInProfileTd);

        const phoneNumberTd = document.createElement("td");
        phoneNumberTd.innerText = phoneNumber;
        tr.appendChild(phoneNumberTd);

        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "&times;";
        deleteIcon.style.cursor = "pointer";

        deleteIcon.addEventListener("click", (e) => {
            this.deleteContact(id);
        });

        tr.appendChild(deleteIcon);
        ContactsListApp.tableBody.appendChild(tr);
    };

    createContacts = () => {
        ContactsListApp.tableBody.innerHTML = "";
        const contacts = this.getAll();
        for (const contact of contacts) {
            this.createContact(contact);
        }
    };

    initForm = () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const id = crypto.randomUUID();
            const firstName = document.querySelector("#firstNameInput").value;
            const lastName = document.querySelector("#lastNameInput").value;
            const email = document.querySelector("#emailInput").value;
            const linkedInProfile = document.querySelector(
                "#linkedInProfileInput"
            ).value;
            const phoneNumber =
                document.querySelector("#phoneNumberInput").value;

            const contact = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                linkedInProfile: linkedInProfile,
                phoneNumber: phoneNumber
            };

            this.addContact(contact);

            form.reset();
        });
    };

    init = () => {
        this.createContacts();
        this.initForm();
    };
}

const app = new ContactsListApp();
app.init();
