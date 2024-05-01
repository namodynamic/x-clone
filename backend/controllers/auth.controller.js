export const signUp = (req, res) => {
  res.json({
    data: "You hit this signup endpoint",
  });
};

export const login = (req, res) => {
  res.json({
    data: "You hit this login endpoint",
  });
};

export const logout = (req, res) => {
  res.json({
    data: "You hit this logout endpoint",
  });
}
