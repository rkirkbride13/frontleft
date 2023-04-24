import User, { IUser } from "../../models/users";
import "../mongodb_helper";

describe("User", () => {
  let user: IUser;
  beforeEach(async () => {
    // Delete all users from the database and create a new user before each test
    await User.deleteMany();
    user = await User.create({
      name: "Robbie",
      email: "robbie@email.com",
      password: "password1",
    });
  });

  it("has a name, email and password", () => {
    // Test that the user has the correct properties
    expect(user.name).toEqual("Robbie");
    expect(user.email).toEqual("robbie@email.com");
    expect(user.password).toEqual("password1");
  });

  it("users are saved to the database and can be accessed", async () => {
    // Retrieve all users from the database
    const users = await User.find();
    // Test that the number of retrieved users is correct
    expect(users.length).toEqual(1);
    // Test that the retrieved user has the correct properties
    expect(users[0].name).toEqual("Robbie");
  });

  it("cannot create a user with an existing email address", async () => {
    // Define a new user with the same email address as the existing user
    let dupilcate: IUser = new User({
      name: "Robbie New",
      email: "robbie@email.com",
      password: "password2",
    });
    // Attempt to save the new user, and expect it to throw an error
    dupilcate
      .save()
      .then(() => fail("No error raised when saving the file"))
      .catch((error) => {});
    const users = await User.find();
    // Test that the number of retrieved users is still 1, indicating that the duplicate was not saved
    expect(users.length).toEqual(1);
    expect(users[0].name).toEqual("Robbie");
  });
});
