export const getUserRole = (userRoleId, roles) => {
    return roles.filter((roles) => roles.id === userRoleId);
};
