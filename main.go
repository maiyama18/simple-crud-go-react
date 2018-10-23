package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"

	_ "github.com/go-sql-driver/mysql"
)

type Character struct {
	ID        uint      `json:"id" gorm:"AUTO_INCREMENT"`
	Name      string    `json:"name"`
	Age       uint      `json:"age"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func main() {
	db, err := initDb()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	router := gin.Default()

	router.GET("/characters", func(ctx *gin.Context) {
		var characters []Character
		db.Find(&characters)

		ctx.JSON(http.StatusOK, characters)
	})

	router.GET("/characters/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")
		var character Character
		if err := db.Where("id = ?", id).First(&character).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, character)
	})

	router.POST("/characters", func(ctx *gin.Context) {
		var character Character
		if err := ctx.ShouldBind(&character); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&character)

		ctx.JSON(http.StatusOK, character)
	})

	router.PUT("/characters/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")
		var character, updated Character
		if err := db.Where("id = ?", id).First(&character).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		if err := ctx.ShouldBind(&updated); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		character.Name = updated.Name
		character.Age = updated.Age
		db.Save(&character)

		ctx.JSON(http.StatusOK, character)
	})

	router.DELETE("/characters/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")
		db.Where("id = ?", id).Delete(Character{})

		ctx.String(http.StatusOK, "deleted")
	})

	router.Run(":4000")
}

func initDb() (*gorm.DB, error) {
	db, err := gorm.Open("mysql", "root:@/playground?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		return nil, err
	}

	db.DropTableIfExists(&Character{})
	db.CreateTable(&Character{})
	insertFixtures(db)

	return db, nil
}

func insertFixtures(db *gorm.DB) {
	characters := []Character{
		Character{Name: "aoi", Age: 21},
		Character{Name: "ema", Age: 21},
		Character{Name: "shizuka", Age: 21},
	}

	for _, character := range characters {
		db.Create(&character)
	}
}
