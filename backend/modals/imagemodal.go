package modals


import "time"

// Image represents a row in user_images table
type Image struct {
	ID           int        `json:"id"`
	UserID       int        `json:"user_id"` // set from JWT (not frontend)
	ImageURL     string     `json:"image_url"`
	PublicID     string     `json:"public_id"`
	FileName     string     `json:"file_name"`
	FileSizeMB   float64    `json:"file_size_mb"`
	ExpiresAt    *time.Time `json:"expires_at,omitempty"`
	PasswordHash *string    `json:"-"` // never expose hash
	IsActive     bool       `json:"is_active"`
	UploadedAt   time.Time  `json:"uploaded_at"`
}
