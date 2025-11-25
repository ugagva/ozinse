import {useCallback, useEffect, useState} from "react";
import {BASE_URL} from "../../utils/constants.js";
import {BackendRoleData, RoleData} from "./RolesPage.tsx";

// type RoleData = {
//     title: string;
//     age_categories: number;
//     projects: number;
//     roles: number;
//     types: number;
//     users: number;
// };

export const useRoles = (token: string | undefined) => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<RoleData[]>([]);
    const [error, setError] = useState<string | null>(null);


// 🔹 Соответствие текстовых действий числам
    const accessLevelMap: Record<number, string> = {
        1: "(Редактирование)",
        2: "(Добавление)",
        3: "(Удаление)",
        4: "(Только чтение)",
    };


    const normalizeRole = (role: BackendRoleData): RoleData => ({
        id: role.ID,
        title: [role.Title],
        projects: [accessLevelMap[role.Projects] || "Неизвестно"],
        ageCategories: [accessLevelMap[role.AgeCategories] || "Неизвестно"],
        genres: [accessLevelMap[role.Genres] || "Неизвестно"],
        types: [accessLevelMap[role.Types] || "Неизвестно"],
        roles: [accessLevelMap[role.Roles] || "Неизвестно"],
        users: [accessLevelMap[role.Users] || "Неизвестно"],
    });

    const getRoles = useCallback(async (): Promise<RoleData[]> => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}v1/roles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Ошибка при получении ролей");
            const data: BackendRoleData[] = await res.json();
            const normalized = data.map(normalizeRole);
            setRoles(normalized);
            return normalized;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
            console.error(err);
            setRoles([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, [token]); // 🔹


    // ✅ Получаем конкретную роль по ID
    const getRoleById = useCallback(
        async (id: number): Promise<RoleData> => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${BASE_URL}v1/roles/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Ошибка при загрузке роли");
                const backendRole: BackendRoleData = await res.json();
                const normalized = normalizeRole(backendRole);
                return normalized;
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                setError(errorMessage);
                console.error("getRoleById error:", err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [token]
    );
    // ✅
    useEffect(() => {
        const fetchRoles = async () => {
            await getRoles();
        };
        fetchRoles().then();
    }, [getRoles]); // добавляем getRoles в зависимости


    // const getRoles = async (): Promise<RoleData[]>  => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const res = await fetch(`${BASE_URL}v1/roles`, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         });
    //         if (!res.ok) throw new Error("Ошибка при получении ролей");
    //         const data:BackendRoleData[] = await res.json();
    //
    //         // 🔹 Нормализуем каждый объект
    //         const normalized = data.map(normalizeRole);
    //      setRoles(normalized);
    //         return normalized;           // массив ролей с бэка
    //     } catch (err:unknown) {
    //         const errorMessage = err instanceof Error ? err.message : String(err);
    //         setError(errorMessage);
    //         console.error(err);
    //         setRoles([]);
    //         return [];
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //

    const actionToNumber: Record<string, number> = {
        "Только чтение": 1,
        "Добавление": 2,
        "Редактирование": 3
    };

    const createRole = async (roleData: RoleData) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${BASE_URL}v1/roles`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...roleData,
                    title: roleData.title[0],
                    projects: actionToNumber[roleData.projects[0]],
                    ageCategories: actionToNumber[roleData.ageCategories[0]],
                    genres: actionToNumber[roleData.genres[0]] ?? 0,
                    types:actionToNumber[roleData.types[0] ?? 0],
                    roles: actionToNumber[roleData.roles[0]],
                    users: actionToNumber[roleData.users[0]],
                }),

            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Ошибка создания роли");
            }

            const data = await res.json();
            return data; // сюда приходит созданная роль {id, title,...}
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
            console.error("Ошибка при создании роли:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };


    const updateRole = async (roleId: number, roleData: {
        ageCategories: string[];
        projects: string[];
        roles: string[];
        id: number;
        title: string[];
        types: number[];
        users: string[]

    }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}v1/roles/${roleId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: roleData.title[0],
                    projects: actionToNumber[roleData.projects[0]],
                    ageCategories: actionToNumber[roleData. ageCategories[0]],
                    roles: actionToNumber[roleData.roles[0]],
                    types:actionToNumber[roleData.types[0] ?? 0],
                    users: actionToNumber[roleData.users[0]],
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Ошибка обновления роли");
            }

            const data = await res.json();
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
            console.error("Ошибка при обновлении роли:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };


    const deleteRole = async (roleId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}v1/roles/${roleId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Ошибка при удалении роли");
            return true;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
            console.error(err);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return {roles, createRole, updateRole, deleteRole, getRoles, loading, error, getRoleById};
};