export const permission = (userRoleId, roles) => {
    const filterRoles = roles.filter((role) => role.id === 1 || role.id === 3);
    const bool = filterRoles.filter((index) => index.id === userRoleId);
    if (bool.length === 0) {
        return false;
    } else {
        return true;
    }
};
