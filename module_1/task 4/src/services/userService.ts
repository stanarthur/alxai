async function fetchUserById(id: string): Promise<User | null> {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}
