AddEditProject (mode: "add" | "edit")
├── useParams() -> projectId
 ├── useState() -> project, activeSection, isFilledSection
 ├── useContext(ProjectsContext)
 │     ├── getProjectData()
 │     ├── addProject()
 │     └── updateProject()
 ├── useModalManager() -> modalType, openModal(), closeModal()
 ├── useEffect(() => { if edit -> fetch project })
 │
├── SectionSwitcher (только в режиме edit)
│
└── Секции (пошаговая форма):
├── MainSection        <- Основная информация
       ├── VideoSection       <- Серии и видео
       └── MediaSection       <- Обложка, скриншоты

Форма переходов:
    [Далее] — активирует следующую секцию
    [Назад] — возвращает к предыдущей секции
    [Добавить / Сохранить] — собирает данные и вызывает addProject() / updateProject()


Что передаётся в секции
Каждая секция получает:
tsx
Копировать
Редактировать
<MainSection
tempProject={project}
setTempProject={setProject}
setIsFilledSection={setIsFilledSection}
/>
tempProject — текущие данные проекта

setTempProject — функция для обновления этих данных

setIsFilledSection — флаг, определяющий, можно ли нажимать "Далее"