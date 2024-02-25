import Contact from "../models/contact.model.js";
import { errorHandler } from "../utils/error.js";
export const createController = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return next(errorHandler(400, "All field required"));
  }

  const newContact = new Contact({
    userId: req.user.id,
    name,
    email,
    phone,
  });
  try {
    await newContact.save();
    res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
};
export const getAllContactController = async (req, res, next) => {
  const allContact = await Contact.find();
  if (!allContact) {
    return next(errorHandler(505, "conatct not found"));
  }
  res.json(allContact);
};
export const getOneContactController = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(errorHandler(403, "Contact not found"));
  }
  res.json(contact);
};
export const updateContactController = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(errorHandler(404, "Contact not found"));
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
};
export const deleteContactController = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(errorHandler(505, "contact not found"));
  }
  if (req.user.id !== contact._id) {
    console.log(req.user.id);
    return next(errorHandler(505, "u are not allowed to delete"));
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.json("Contact Deleted");
};
