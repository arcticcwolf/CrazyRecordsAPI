
USE [master]
GO

/****** Object:  Database [CrazyRecords]    Script Date: 5/27/2020 9:32:09 PM ******/
CREATE DATABASE [CrazyRecords]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CrazyRecords', FILENAME = N'd:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\CrazyRecords.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CrazyRecords_log', FILENAME = N'd:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\CrazyRecords_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [CrazyRecords] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CrazyRecords].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CrazyRecords] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CrazyRecords] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CrazyRecords] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CrazyRecords] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CrazyRecords] SET ARITHABORT OFF 
GO
ALTER DATABASE [CrazyRecords] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CrazyRecords] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CrazyRecords] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CrazyRecords] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CrazyRecords] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CrazyRecords] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CrazyRecords] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CrazyRecords] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CrazyRecords] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CrazyRecords] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CrazyRecords] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CrazyRecords] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CrazyRecords] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CrazyRecords] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CrazyRecords] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CrazyRecords] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CrazyRecords] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CrazyRecords] SET RECOVERY FULL 
GO
ALTER DATABASE [CrazyRecords] SET  MULTI_USER 
GO
ALTER DATABASE [CrazyRecords] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CrazyRecords] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CrazyRecords] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CrazyRecords] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CrazyRecords] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'CrazyRecords', N'ON'
GO
ALTER DATABASE [CrazyRecords] SET QUERY_STORE = OFF
GO
USE [CrazyRecords]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [CrazyRecords]
GO
--/****** Object:  User [samana]    Script Date: 5/27/2020 9:32:09 PM ******/
--CREATE USER [samana] FOR LOGIN [samana] WITH DEFAULT_SCHEMA=[dbo]
--GO
/****** Object:  Table [dbo].[AlbumArtist]    Script Date: 5/27/2020 9:32:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AlbumArtist](
	[album_id] [int] NOT NULL,
	[artist_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[album_id] ASC,
	[artist_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Album]    Script Date: 5/27/2020 9:32:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Album](
	[releaseDate] [date] NOT NULL,
	[title] [varchar](50) NOT NULL,
	[rating] [int] NULL,
	[year] [int] NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] --TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Artist]    Script Date: 5/27/2020 9:32:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Artist](
	[firstName] [nvarchar](50) NOT NULL,
	[lastName] [nvarchar](50) NOT NULL,
	[birthDate] [date] NOT NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] --TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[AlbumArtist]  WITH CHECK ADD FOREIGN KEY([album_id])
REFERENCES [dbo].[Album] ([id])
GO
ALTER TABLE [dbo].[AlbumArtist]  WITH CHECK ADD FOREIGN KEY([artist_id])
REFERENCES [dbo].[Artist] ([id])
GO


insert into Album  (releasedate, title, rating, year) values ('1990-01-01','new album', 5, 1990)
insert into Album  (releasedate, title, rating, year) values ('2000-01-01','sweet dreams', 8, 2000)
insert into Album  (releasedate, title, rating, year) values ('2006-01-01','album1', 1, 2006)
insert into Album  (releasedate, title, rating, year) values ('2008-01-01','explicit', 3, 2008)

insert into Artist  (firstname, lastname, birthDate) values ( 'pepe', 'palotes', '2000-01-01')
insert into Artist  (firstname, lastname, birthDate) values ( 'jhon', 'smith', '1987-01-01')
insert into Artist  (firstname, lastname, birthDate) values ( 'felix', 'pinto', '2008-01-01')
insert into Artist  (firstname, lastname, birthDate) values ( 'Nacho', 'ko', '2006-01-01')

insert into AlbumArtist ( album_id, artist_id) values (1,1)
insert into AlbumArtist ( album_id, artist_id) values (3,1)
insert into AlbumArtist ( album_id, artist_id) values (3,3)
insert into AlbumArtist ( album_id, artist_id) values (2,4)
insert into AlbumArtist ( album_id, artist_id) values (2,1)
insert into AlbumArtist ( album_id, artist_id) values (1,4)