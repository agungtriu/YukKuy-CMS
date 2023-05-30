const { Op } = require("sequelize");
const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jsonwebtoken");
const models = require("../models");
const deleteFile = require("../helpers/deleteFile");
const profile = models.profile;
const account = models.account;
const socialAccount = models.socialAccount;
const visitAccount = models.visitAccount;
const product = models.product;
class AccountController {
  static async registerCMS(req, res) {
    try {
      let { username, name, email, password, confirmPassword } = req.body;
      username = username.toLowerCase();
      email = email.toLowerCase();
      if (password === confirmPassword) {
        const checkUsername = await account.findOne({ where: { username } });
        const checkEmail = await account.findOne({
          where: { email },
        });
        if (checkUsername !== null) {
          res.status(400).json({
            status: false,
            message: "username not available",
          });
        } else if (checkEmail !== null) {
          res.status(400).json({
            status: false,
            message: "email is already registered",
          });
        } else {
          const result = await account.create({
            username,
            name,
            email,
            password: encryptPwd(password),
            role: "seller",
          });

          if (result !== null) {
            await profile.create({ accountId: result.id });

            res.status(201).json({
              status: true,
              message: `${username} has been created!`,
              data: result,
            });
          } else {
            res.status(400).json({
              status: false,
              message: "account failed to created!",
            });
          }
        }
      } else {
        res.status(400).json({
          status: false,
          message: "password and confirm password not match!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async registerMobile(req, res) {
    try {
      let { username, name, email, password, confirmPassword } = req.body;
      username = username.toLowerCase();
      email = email.toLowerCase();
      if (password === confirmPassword) {
        const checkUsername = await account.findOne({ where: { username } });
        const checkEmail = await account.findOne({ where: { email } });

        if (checkUsername !== null) {
          res.status(400).json({
            status: false,
            message: "username not available",
          });
        } else if (checkEmail !== null) {
          res.status(400).json({
            status: false,
            message: "email is already registered",
          });
        } else {
          const result = await account.create({
            username,
            name,
            email,
            password: encryptPwd(password),
            role: "customer",
          });

          if (result !== null) {
            await profile.create({ accountId: result.id });

            res.status(201).json({
              status: true,
              message: `${username} has been created!`,
              data: result,
            });
          } else {
            res.status(400).json({
              status: false,
              message: "account failed to created!",
            });
          }
        }
      } else {
        res.status(400).json({
          status: false,
          message: "password and confirm password not match!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async loginCMS(req, res) {
    try {
      const { key, password } = req.body;
      const result = await account.findOne({
        where: {
          [Op.or]: [{ role: "seller" }, { role: "admin" }],
          [Op.or]: [
            { username: key.toLowerCase() },
            { email: key.toLowerCase() },
          ],
        },
        include: [profile],
      });
      if (result !== null) {
        if (decryptPwd(password, result.password)) {
          const access_token = tokenGenerator(result);
          res.status(202).json({
            status: true,
            message: "login successful",
            data: {
              id: result.id,
              username: result.username,
              name: result.name,
              role: result.role,
              avatar: result.profile.avatar,
              access_token: access_token,
            },
          });
        } else {
          res.status(400).json({
            status: false,
            message: "invalid password!",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: `${key} was not registered!`,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async loginMobile(req, res) {
    try {
      const { key, password } = req.body;

      const result = await account.findOne({
        where: {
          role: "customer",
          [Op.or]: [
            { username: key.toLowerCase() },
            { email: key.toLowerCase() },
          ],
        },
        include: [profile],
      });
      if (result !== null) {
        if (decryptPwd(password, result.password)) {
          const access_token = tokenGenerator(result);
          res.status(202).json({
            status: true,
            message: "login successful",
            data: {
              id: result.id,
              username: result.username,
              name: result.name,
              avatar: result.profile.avatar,
              access_token: access_token,
            },
          });
        } else {
          res.status(400).json({
            status: false,
            message: "invalid password!",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: `${key} was not registered!`,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getAccountByUsername(req, res) {
    try {
      const username = req.params.username;
      const result = await account.findOne({
        where: { username },
        include: [profile],
      });
      if (result !== null) {
        res.status(200).json({
          status: true,
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "account not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getSellerByUsername(req, res) {
    try {
      const username = req.params.username;
      const result = await account.findOne({
        where: { username },
        include: [profile, socialAccount, product],
      });
      if (result !== null && result.role === "seller") {
        await visitAccount.create({
          accountId: result.id,
        });

        await res.status(200).json({
          status: true,
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "account not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async editPassword(req, res) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const id = +req.accountData.id;
      if (oldPassword !== newPassword) {
        if (newPassword === confirmPassword) {
          const _account = await account.findOne({ where: { id: id } });
          if (decryptPwd(oldPassword, _account.password)) {
            const result = await account.update(
              {
                password: encryptPwd(newPassword),
              },
              {
                where: { id },
              }
            );
            if (result[0] === 1) {
              res.status(201).json({
                status: true,
                message: "update password successful",
              });
            } else {
              res.status(400).json({
                status: false,
                message: "update password unsuccessful",
              });
            }
          } else {
            res.status(400).json({
              status: false,
              message: "invalid old password!",
            });
          }
        } else {
          res.status(400).json({
            status: false,
            message: "new password and confirm password not match!",
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message: "new password cannot same!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async editAvatar(req, res) {
    try {
      const id = +req.accountData.id;
      const _profile = await profile.findOne({
        where: { accountId: id },
      });
      const avatar = req.file.filename;
      const result = await profile.update(
        {
          avatar,
        },
        { where: { accountId: id } }
      );

      if (result[0] === 1) {
        deleteFile(_profile.avatar);

        const _result = await profile.findOne({
          where: { accountId: id },
        });
        res.status(201).json({
          status: true,
          message: "update avatar successful",
          data: {
            image: _result.avatar,
          },
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update avatar unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async editBanner(req, res) {
    try {
      const id = +req.accountData.id;
      const _profile = await profile.findOne({
        where: { accountId: id },
      });
      const bannerImage = req.file.filename;
      const result = await profile.update(
        {
          bannerImage,
        },
        { where: { accountId: id } }
      );

      if (result[0] === 1) {
        deleteFile(_profile.bannerImage);

        const _result = await profile.findOne({
          where: { accountId: id },
        });
        res.status(201).json({
          status: true,
          message: "update bannerImage successful",
          data: {
            image: _result.bannerImage,
          },
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update bannerImage unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async editProfile(req, res) {
    try {
      const _id = +req.accountData.id;
      const _username = req.accountData.username;
      var { username, name, email, phone, address } = req.body;
      username = username.toLowerCase();
      email = email.toLowerCase();
      const checkUsername = await account.findOne({ where: { username } });
      const checkEmail = await account.findOne({ where: { email } });
      const checkAccount = await account.findOne({ where: { id: _id } });
      if (checkUsername !== null && _username !== username) {
        res.status(400).json({
          status: false,
          message: "username not available",
        });
      } else if (checkEmail !== null && checkAccount.email !== email) {
        res.status(400).json({
          status: false,
          message: "email is already registered",
        });
      } else {
        const result = await account.update(
          {
            username,
            name,
            email,
          },
          { where: { id: _id } }
        );
        if (result[0] === 1) {
          await profile.update(
            {
              phone,
              address,
            },
            { where: { accountId: _id } }
          );

          const result = await account.findOne({
            where: { id: _id },
            include: [profile],
          });

          res.status(201).json({
            status: true,
            message: "update profile successful",
            data: result,
          });
        } else {
          res.status(400).json({
            status: false,
            message: "update profile unsuccessful",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getAccounts(req, res) {
    try {
      const result = await account.findAll({ include: [profile] });
      res.status(200).json({
        status: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async roleAdmin(req, res) {
    try {
      const id = +req.query.id;
      const result = await account.update(
        {
          role: "admin",
        },
        { where: { id } }
      );

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: `${account.name} as an admin`,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update role unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async roleSeller(req, res) {
    try {
      const id = +req.query.id;
      const result = await account.update(
        {
          role: "seller",
        },
        { where: { id } }
      );

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: `${account.name} as an seller`,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update role unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async roleCustomer(req, res) {
    try {
      const id = +req.query.id;
      const result = await account.update(
        {
          role: "customer",
        },
        { where: { id } }
      );

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: `${account.name} as an customer`,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update role unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async deleteAccount(req, res) {
    try {
      const id = +req.query.id;
      const result = await account.destroy({ where: { id } });

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: `${account.name} deleted`,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "delete account unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
}

module.exports = AccountController;
