# Task: REMOVE SUBJECT.ICON

## Plan Progress
- [x] 1. Edit `src/models/subject.model.ts` - Remove icon from model & interface
- [x] 2. Edit `src/subjects/dto/create-subject.dto.ts` - Remove icon property
- [x] 3. Edit `src/subjects/dto/subject-response.dto.ts` - Remove icon comment reference
- [x] 4. Add icon column DROP to `src/database/schema-migration.service.ts`
- [ ] 5. Test Subject creation without icon (run: npm run start:dev)

**ADDITIONAL FIXES:**
- [x] Fixed TypeScript error in subjects.service.ts & controller
