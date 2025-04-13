interface TemplateProps {
  profile: any;
  isEditing: boolean;
  onEdit: (field: string, value: any) => void;
  onExperienceEdit: (index: number, field: string, value: string) => void;
  onEducationEdit: (index: number, field: string, value: string) => void;
  onSkillsEdit: (skills: string[]) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
  accentColor: string;
}

export default function ModernTemplate({ 
  profile, 
  isEditing, 
  onEdit, 
  onExperienceEdit,
  onEducationEdit,
  onSkillsEdit,
  addExperience,
  removeExperience,
  addEducation,
  removeEducation,
  addSkill,
  removeSkill,
  accentColor 
}: TemplateProps) {
  return (
    <div className="p-8" style={{ '--accent-color': accentColor } as any}>
      <div className="border-b border-gray-200 pb-8 mb-8">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onEdit('name', e.target.value)}
              className="text-4xl font-bold w-full border-gray-300 rounded-md"
              style={{ color: accentColor }}
            />
            <input
              type="text"
              value={profile.title}
              onChange={(e) => onEdit('title', e.target.value)}
              className="text-xl text-gray-600 w-full border-gray-300 rounded-md"
            />
            <div className="flex flex-wrap gap-4">
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onEdit('email', e.target.value)}
                className="text-sm text-gray-600 border-gray-300 rounded-md"
                placeholder="Email"
              />
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => onEdit('phone', e.target.value)}
                className="text-sm text-gray-600 border-gray-300 rounded-md"
                placeholder="Phone"
              />
              <input
                type="text"
                value={profile.location}
                onChange={(e) => onEdit('location', e.target.value)}
                className="text-sm text-gray-600 border-gray-300 rounded-md"
                placeholder="Location"
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold" style={{ color: accentColor }}>{profile.name}</h1>
            <h2 className="text-xl text-gray-600 mt-2">{profile.title}</h2>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              <span>{profile.email}</span>
              <span>{profile.phone}</span>
              <span>{profile.location}</span>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: accentColor }}>Professional Summary</h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => onEdit('bio', e.target.value)}
                className="w-full h-32 text-gray-700 border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </section>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>Experience</h2>
            {profile.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                {isEditing && (
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => onExperienceEdit(index, 'position', e.target.value)}
                      className="font-medium w-full border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => onExperienceEdit(index, 'company', e.target.value)}
                      className="text-gray-600 w-full border-gray-300 rounded-md"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => onExperienceEdit(index, 'startDate', e.target.value)}
                        className="text-sm text-gray-500 w-1/2 border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => onExperienceEdit(index, 'endDate', e.target.value)}
                        className="text-sm text-gray-500 w-1/2 border-gray-300 rounded-md"
                      />
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => onExperienceEdit(index, 'description', e.target.value)}
                      className="mt-2 text-gray-700 w-full h-24 border-gray-300 rounded-md"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addExperience}
                className="w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-600"
              >
                + Add Experience
              </button>
            )}
          </div>
        </div>

        <div>
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: accentColor }}>Education</h3>
            <div className="space-y-4">
              {profile.education.map((edu: any, index: number) => (
                <div key={index}>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => onEducationEdit(index, 'school', e.target.value)}
                        className="font-medium w-full border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => onEducationEdit(index, 'degree', e.target.value)}
                        className="text-gray-600 w-full border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => onEducationEdit(index, 'field', e.target.value)}
                        className="text-gray-600 w-full border-gray-300 rounded-md"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => onEducationEdit(index, 'startDate', e.target.value)}
                          className="text-sm text-gray-500 w-1/2 border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => onEducationEdit(index, 'endDate', e.target.value)}
                          className="text-sm text-gray-500 w-1/2 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-medium">{edu.school}</h4>
                      <div className="text-gray-600">{edu.degree} in {edu.field}</div>
                      <div className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>Education</h2>
            {profile.education.map((edu: any, index: number) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                {isEditing && (
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => onEducationEdit(index, 'school', e.target.value)}
                      className="font-medium w-full border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => onEducationEdit(index, 'degree', e.target.value)}
                      className="text-gray-600 w-full border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => onEducationEdit(index, 'field', e.target.value)}
                      className="text-gray-600 w-full border-gray-300 rounded-md"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => onEducationEdit(index, 'startDate', e.target.value)}
                        className="text-sm text-gray-500 w-1/2 border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => onEducationEdit(index, 'endDate', e.target.value)}
                        className="text-sm text-gray-500 w-1/2 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium">{edu.school}</h3>
                    <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addEducation}
                className="w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-600"
              >
                + Add Education
              </button>
            )}
          </div>

          <section>
            <h3 className="text-lg font-semibold mb-4" style={{ color: accentColor }}>Skills</h3>
            {isEditing ? (
              <div className="space-y-2">
                {profile.skills.map((skill: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => onSkillsEdit(profile.skills.map((s: string, i: number) => 
                        i === index ? e.target.value : s
                      ))}
                      className="flex-1 text-sm border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSkill}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  + Add Skill
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
} 