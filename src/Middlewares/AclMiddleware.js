const PermissionRepository = SystemLoad.repository('PermissionRepository');

class AclMiddleware {

    async start(acl, group_id) {

        const rules = await PermissionRepository.getAll({"group": group_id});

        acl.config({
            baseUrl: "/",
            rules: rules,
            roleSearchPath: "group_id"
        },{
            status: "Access Denied",
            message: "You are not authorized to access this resource",
        });

    }

}

module.exports = new AclMiddleware();
